
CREATE TAble Users (
    Id varchar(255) PRIMARY KEY,
    Name varchar(255) NOT NULL,
    Email varchar(255) NOT NULL UNIQUE,
    Password varchar(255) NOT NULL,
    isDeleted INT DEFAULT 0,
    isEmailSent INT DEFAULT 0
)