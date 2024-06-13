use Shop
go
CREATE OR ALTER PROCEDURE addCategory(
    @id VARCHAR(255),
    @name varchar(255)
)
AS
BEGIN
    INSERT into Categories VALUES (@id, @name)
END
go