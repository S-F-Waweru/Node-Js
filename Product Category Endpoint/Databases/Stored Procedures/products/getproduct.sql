use Shop
go
CREATE or ALTER  PROCEDURE getProduct(@id varchar(255))
as 
BEGIN
SELECT * FROM Products WHERE id = @id
end
go