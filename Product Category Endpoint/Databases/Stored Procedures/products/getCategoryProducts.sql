use Shop
go
CREATE or ALTER  PROCEDURE getCategoryProducts(@catid varchar(255))
as 
BEGIN
SELECT * FROM Products WHERE catid = @catid
end
go