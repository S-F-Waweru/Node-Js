USE Shop
go
CREATE OR ALTER PROCEDURE updateProduct
(@id VARCHAR(255),
    @name VARCHAR(255),
    @description VARCHAR(255),
    @price int,
    @catid VARCHAR(255))
    AS
BEGIN
    UPDATE Products SET name = @name , description = @description, price = @price , catid = @catid WHERE id= @id
END
go