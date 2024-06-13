CREATE OR ALTER PROCEDURE getUser(@Email varchar(255))
AS
BEGIN
    SELECT * FROM Users WHERE Email = @Email
END