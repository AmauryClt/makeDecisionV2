CREATE TABLE user (
    Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL,
    username VARCHAR(80) NOT NULL UNIQUE,
    Lastname VARCHAR(50),
    Firstname VARCHAR(50),
    Numeromob VARCHAR(50),
    Adresse VARCHAR(255),
    Numerofix VARCHAR(50),
    hashedPassword VARCHAR(255) NOT NULL,
    Admin TINYINT DEFAULT 0
);

CREATE TABLE impactedService (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Service VARCHAR(50) NOT NULL
);

CREATE TABLE demand (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Deadline DATE,
    Content TEXT,
    Benefice TEXT,
    Inconvenience TEXT,
    Statut ENUM('EN ATTENTE DE VOTE', 'EN DESACCORD', 'VALIDE', 'MISE EN PLACE', 'ARCHIVE', 'QUARANTAINE') DEFAULT 'EN ATTENTE DE VOTE',
    Note FLOAT,
    UserId INT NOT NULL,
    CONSTRAINT fk_demand_user
    FOREIGN KEY (UserId)
    REFERENCES user(Id)
);

CREATE TABLE demandServiceJoin (
    ServiceId INT NOT NULL,
    DemandId INT NOT NULL,
    PRIMARY KEY (ServiceId, DemandId),
    CONSTRAINT fk_service_join
    FOREIGN KEY (ServiceId)
    REFERENCES impactedService(Id),
    CONSTRAINT fk_demand_join
    FOREIGN KEY (DemandId)
    REFERENCES demand(Id)
);

CREATE TABLE interaction (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Comment TEXT,
    Note FLOAT,
    UserId INT NOT NULL,
    demand_Id INT NOT NULL,
    CONSTRAINT fk_interaction_user
    FOREIGN KEY (UserId)
    REFERENCES user(Id),
    CONSTRAINT fk_interaction_demand
    FOREIGN KEY (demand_Id)
    REFERENCES demand(Id)
);

CREATE TABLE stakeholder (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Role ENUM('ADMIN', 'EXPERT', 'SALARIE', 'BENEVOLE') DEFAULT 'ADMIN',
    UserId INT NOT NULL,
    demand_Id INT NOT NULL,
    CONSTRAINT fk_stakeholder_user
    FOREIGN KEY (UserId)
    REFERENCES user(Id),
    CONSTRAINT fk_stakeholder_demand
    FOREIGN KEY (demand_Id)
    REFERENCES demand(Id)
);

INSERT INTO user (Email, username, Lastname, Firstname, Numeromob, Adresse, Numerofix, hashedPassword, Admin)
VALUES
('user@user.fr', 'user', 'DUPONT', 'Francois', '06 78 45 58 23', '157 Avenue Victor Hugo Le Grand Chapitôt', '04 45 85 25 10', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('dubrulle-fagnoni@user.fr', 'dubrulle-fagnoni',  'DUBRULLE FAGNONI', 'Alex', '07 71 47 57 23', '215 Avenue Victor Hugo Le Grand Chapitôt', '04 45 75 25 94', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('clot@user.fr', 'clot', 'CLOT', 'Amaury', '07 78 45 48 43', '31 Avenue Victor Hugo Le Grand Chapitôt', '04 45 85 25 10', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('chabaud@user.fr', 'chabaud', 'CHABAUD', 'Fabien', '06 71 42 57 83', '177 Avenue Victor Hugo Le Grand Chapitôt', '04 45 45 21 93', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('girbau@user.fr', 'girbau', 'GIRBAU', 'Laëtitia', '06 78 15 78 53', '377 Avenue Victor Hugo Le Grand Chapitôt', '04 15 84 25 93', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('denneulin@user.fr', 'denneulin', 'DENNEULIN', 'Thomas', '06 74 31 58 73', '757 Avenue Victor Hugo Le Grand Chapitôt', '04 47 85 25 93', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 0);

INSERT INTO demand (Title, Deadline, Content, Benefice, Inconvenience, Statut, Note, UserId)
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

  INSERT INTO impactedService (Service) VALUES ('ADMINISTRATIF'),('COMPTABILITE'),('MARKETING'),('RESSOURCES HUMAINES'),('COMMERCIAL')

