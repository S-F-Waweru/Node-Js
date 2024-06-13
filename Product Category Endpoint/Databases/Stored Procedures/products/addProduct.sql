use Shop
go
CREATE OR ALTER PROCEDURE addProduct(@id VARCHAR(255),
    @name VARCHAR(255),
    @description VARCHAR(255),
    @price int,
    @catid VARCHAR(255))
AS
BEGIN
    INSERT INTO Products
    VALUES(
            @id ,
            @name,
            @description,
            @price,
            @catid
    )

END
go