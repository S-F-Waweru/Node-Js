use Shop
go
CREATE OR ALTER PROCEDURE deleteProduct (@id varchar(255))
AS
BEGIN
    DELETE FROM Products WHERE id = @id
END
go