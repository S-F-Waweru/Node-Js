use Shop
go
CREATE or ALTER PROCEDURE getCategories
as
BEGIN
    SELECT * FROM Categories
end
go