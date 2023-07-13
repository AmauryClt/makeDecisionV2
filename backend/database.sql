CREATE TABLE user (
    Id INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL,
    Lastname VARCHAR(50),
    Firstname VARCHAR(50),
    Numeromob VARCHAR(50),
    Adresse VARCHAR(255),
    Numerofix VARCHAR(50),
    Password VARCHAR(50),
    Admin TINYINT DEFAULT 0,
    PRIMARY KEY (Id)
);

-- Admin tinyint 0=False 1=True

CREATE TABLE demand (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Deadline DATE,
    Content TEXT,
    Benefice TEXT,
    Inconvenience TEXT,
    ServiceImpact ENUM('ADMINISTRATIF', 'COMPTABILITE', 'MARKETING', 'RESSOURCE HUMAINE', 'COMMERCIAL'),
    Statut ENUM('EN ATTENTE DE VOTE', 'EN DESACCORD', 'VALIDE', 'MISE EN PLACE', 'ARCHIVE', 'QUARANTAINE') NOT NULL DEFAULT 'EN ATTENTE DE VOTE',
    Note FLOAT,
    userId INT DEFAULT 2,
    CONSTRAINT fk_demand_user
    FOREIGN KEY (userId)
    REFERENCES user(Id)
);

CREATE TABLE interaction (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Content TEXT,
    Note FLOAT,
    userId INT NOT NULL,
    demand_Id INT NOT NULL,
    CONSTRAINT fk_interaction_user
    FOREIGN KEY (userId)
    REFERENCES user(Id),
    CONSTRAINT fk_interaction_demand
    FOREIGN KEY (demand_Id)
    REFERENCES demand(Id)
);

CREATE TABLE stakeholder (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Role ENUM('ADMIN', 'EXPERT', 'SALARIE', 'BENEVOLE') DEFAULT 'ADMIN',
    userId INT NOT NULL,
    demand_Id INT NOT NULL,
    CONSTRAINT fk_stakeholder_user
    FOREIGN KEY (userId)
    REFERENCES user(Id),
    CONSTRAINT fk_stakeholder_demand
    FOREIGN KEY (demand_Id)
    REFERENCES demand(Id)
);

INSERT INTO user (Email, Lastname, Firstname, Numeromob, Adresse, Numerofix, Password, Admin)
VALUES
('user@user.fr', 'DUPONT', 'Francois', '06 78 45 58 23', '157 Avenue Victor Hugo Le Grand Chapitôt', '04 45 85 25 10', 'user1234', 1),
('dubrulle-fagnoni@user.fr', 'DUBRULLE FAGNONI', 'Alex', '07 71 47 57 23', '215 Avenue Victor Hugo Le Grand Chapitôt', '04 45 75 25 94', 'user1234', 1),
('clot@user.fr', 'CLOT', 'Amaury', '07 78 45 48 43', '31 Avenue Victor Hugo Le Grand Chapitôt', '04 45 85 25 73', 'user1234', 1),
('chabaud@user.fr', 'CHABAUD', 'Fabien', '06 71 42 57 83', '177 Avenue Victor Hugo Le Grand Chapitôt', '04 45 45 21 93', 'user1234', 1),
('girbau@user.fr', 'GIRBAU', 'Laëtitia', '06 78 15 78 53', '377 Avenue Victor Hugo Le Grand Chapitôt', '04 15 84 25 93', 'user1234', 1),
('denneulin@user.fr', 'DENNEULIN', 'Thomas', '06 74 31 58 73', '757 Avenue Victor Hugo Le Grand Chapitôt', '04 47 85 25 93', 'user1234', 0);

INSERT INTO demand (Title, Deadline, Content, Benefice, Inconvenience, Statut, Note, userId)
VALUES
  ('Demande 1', '2023-07-15', 'Contenu de la demande 1', 'Bénéfice de la demande 1', 'Inconvénient de la demande 1', 'EN ATTENTE DE VOTE', 4, 3),
  ('Demande 2', '2023-07-15', 'Contenu de la demande 2', 'Bénéfice de la demande 2', 'Inconvénient de la demande 2', 'EN ATTENTE DE VOTE', 3, 1),
  ('Demande 3', '2023-07-15', 'Contenu de la demande 3', 'Bénéfice de la demande 3', 'Inconvénient de la demande 3', 'EN DESACCORD', 2, 4),
  ('Demande 4', '2023-07-15', 'Contenu de la demande 4', 'Bénéfice de la demande 4', 'Inconvénient de la demande 4', 'EN ATTENTE DE VOTE', 4, 5),
  ('Demande 5', '2023-07-15', 'Contenu de la demande 5', 'Bénéfice de la demande 5', 'Inconvénient de la demande 5', 'EN ATTENTE DE VOTE', 4, 6),
  ('Demande 6', '2023-07-15', 'Contenu de la demande 6', 'Bénéfice de la demande 6', 'Inconvénient de la demande 6', 'EN DESACCORD', 1, 1),
  ('Demande 7', '2023-07-15', 'Contenu de la demande 7', 'Bénéfice de la demande 7', 'Inconvénient de la demande 7', 'ARCHIVE', 4, 2),
  ('Demande 8', '2023-07-15', 'Contenu de la demande 8', 'Bénéfice de la demande 8', 'Inconvénient de la demande 8', 'ARCHIVE', 5, 2),
  ('Demande 9', '2023-07-15', 'Contenu de la demande 9', 'Bénéfice de la demande 9', 'Inconvénient de la demande 9', 'VALIDE', 4, 3),
  ('Demande 10', '2023-07-15', 'Contenu de la demande 10', 'Bénéfice de la demande 10', 'Inconvénient de la demande 10', 'VALIDE', 4, 5);
