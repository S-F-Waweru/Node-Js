use Shop
go
CREATE or ALTER  PROCEDURE getProducts
as
BEGIN
    SELECT *
    FROM Products
end
go