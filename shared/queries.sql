CREATE TABLE ChangeTokens(
	id int primary key AUTO_INCREMENT,
    TOKEN varchar(20) NOT NULL,
    updated_at timestamp NOT NULL,
    document_id int NOT NULL,
    FOREIGN KEY (document_id) REFERENCES documents(id)
);
