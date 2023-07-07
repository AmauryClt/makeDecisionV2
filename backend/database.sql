CREATE TABLE user (
    Id INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL,
    Lastname VARCHAR(50),
    Firstname VARCHAR(50),
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
    Utility VARCHAR(255),
    Context TEXT,
    Benefice TEXT,
    Inconvenience TEXT,
    Complement TEXT,
    ServiceImpact ENUM('ADMINISTRATIF', 'COMPTABILITE', 'MARKETING', 'RESSOURCE HUMAINE', 'COMMERCIAL'),
    Statut ENUM('EN ATTENTE DE VOTE', 'EN DESACCORD', 'VALIDE', 'MISE EN PLACE', 'ARCHIVE', 'QUARANTAINE') DEFAULT 'EN ATTENTE DE VOTE',
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

INSERT INTO user (Email, Lastname, Firstname, Password, Admin)
VALUES
('user@user.fr', 'DUPONT', 'Francois', 'user1234', 1),
('dubrulle-fagnoni@user.fr', 'DUBRULLE FAGNONI', 'Alex', 'user1234', 1),
('clot@user.fr', 'CLOT', 'Amaury', 'user1234', 1),
('chabaud@user.fr', 'CHABAUD', 'Fabien', 'user1234', 1),
('girbau@user.fr', 'GIRBAU', 'Laëtitia', 'user1234', 1),
('denneulin@user.fr', 'DENNEULIN', 'Thomas', 'user1234', 0);

INSERT INTO demand (Title, Deadline, Content, Utility, Context, Benefice, Inconvenience, Complement, Statut, Note, userId)
VALUES
('TITRE DE NOTRE DECISION 1', '2023-07-31', 'Il faut meubler donc je meuyble avec du texte qui nest pourtant pas du meuble mais bien du meublage', 'Voir une demande en attente', 'En attente de vote', 'Il y a des benefices a prendre des decision', 'Mais il y a aussi des risques a prendre', 'je complète', 'EN ATTENTE DE VOTE', '4', 1),
('DECISION 2', '2023-07-31', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Voir une demande en désaccord', 'En désaccord', 'Il y a des benefices a prendre des decision', 'Mais il y a aussi des risques a prendre', 'je ne suis pas daccord', 'EN DESACCORD', '5', 2),
('VOICI UN TITRE VALIDE', '2023-07-31', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Voir une demande en validée', 'Validée', 'Il y a des benefices a prendre des decision','Mais il y a aussi des risques a prendre', 'je ne suis pas daccord', 'EN DESACCORD', '3', 2);
