import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import sqlite3

from backend.main import DB_PATH, create_schema, normalize_session


def rebuild_db(source_path: Path, target_path: Path, overwrite: bool) -> int:
    if not source_path.exists():
        print(f"Source DB not found: {source_path}")
        return 1

    temp_path = target_path.with_suffix(".tmp")
    if temp_path.exists():
        temp_path.unlink()

    source_conn = sqlite3.connect(source_path)
    source_conn.row_factory = sqlite3.Row

    target_conn = sqlite3.connect(temp_path)
    target_conn.row_factory = sqlite3.Row
    target_conn.execute("PRAGMA foreign_keys = ON")
    create_schema(target_conn)

    session_table = source_conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='sessions'"
    ).fetchone()
    if not session_table:
        print("Source DB does not contain a sessions table.")
        return 1

    columns = {
        row[1] for row in source_conn.execute("PRAGMA table_info(sessions)").fetchall()
    }
    if "payload" not in columns:
        print("Source sessions table is missing payload column.")
        return 1

    rows = source_conn.execute("SELECT * FROM sessions").fetchall()
    processed = 0
    for row in rows:
        payload = row["payload"]
        if not payload:
            continue
        created_at = row["created_at"] if "created_at" in columns else datetime.now(timezone.utc).isoformat()
        session = json.loads(payload)
        normalize_session(target_conn, row["session_id"], session, created_at)
        processed += 1

    target_conn.commit()
    source_conn.close()
    target_conn.close()

    if target_path.exists():
        if not overwrite:
            print(f"Target DB already exists: {target_path}")
            print("Use --overwrite to replace it.")
            temp_path.unlink()
            return 1
        target_path.unlink()

    temp_path.replace(target_path)
    print(f"Rebuilt {processed} sessions into {target_path}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Rebuild the SQLite DB with foreign keys.")
    parser.add_argument("--source", type=Path, default=DB_PATH, help="Source DB path")
    parser.add_argument(
        "--target",
        type=Path,
        default=DB_PATH,
        help="Target DB path",
    )
    parser.add_argument("--overwrite", action="store_true", help="Overwrite target DB")
    args = parser.parse_args()
    return rebuild_db(args.source, args.target, args.overwrite)


if __name__ == "__main__":
    raise SystemExit(main())
