-- Trigger for Todo Table
CREATE OR REPLACE FUNCTION log_todo_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO "Log" ("table_name", "action", "record_id")
        VALUES ('Todo', 'DELETE', OLD.id);
    ELSE
        INSERT INTO "Log" ("table_name", "action", "record_id")
        VALUES ('Todo', 'UPDATE', NEW.id);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER todo_changes_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Todo"
FOR EACH ROW EXECUTE FUNCTION log_todo_changes();

-- Trigger for Tag Table
CREATE OR REPLACE FUNCTION log_tag_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO "Log" ("table_name", "action", "record_id")
        VALUES ('Tag', 'DELETE', OLD.id);
    ELSE
        INSERT INTO "Log" ("table_name", "action", "record_id")
        VALUES ('Tag', 'UPDATE', NEW.id);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tag_changes_trigger
AFTER INSERT OR UPDATE OR DELETE ON "Tag"
FOR EACH ROW EXECUTE FUNCTION log_tag_changes();
