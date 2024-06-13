use Shop
CREATE Table products (
	id varchar(255) primary key,
	name varchar (255),
	description varchar(255),
	price int,
	catid varchar(255) foreign Key  References Categories(id)
)