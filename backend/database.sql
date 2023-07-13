CREATE TABLE user (
    Id INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL,
    username VARCHAR(80) NOT NULL UNIQUE,
    Lastname VARCHAR(50),
    Firstname VARCHAR(50),
    Statut VARCHAR(50),
    Numeromob VARCHAR(50),
    Adresse VARCHAR(255),
    Numerofix VARCHAR(50),
    hashedPassword VARCHAR(255) NOT NULL,
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
    CONSTRAINT fk_demand_user FOREIGN KEY (userId) REFERENCES user(Id)
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


INSERT INTO user (Email, username, Lastname, Firstname, Statut, Numeromob, Adresse, Numerofix, hashedPassword, Admin)
VALUES
('user@user.fr', 'user', 'DUPONT', 'Francois', 'Juriste', '06 78 45 58 23', '157 Avenue Victor Hugo Le Grand Chapitôt', '04 45 85 25 10', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('dubrulle-fagnoni@user.fr', 'dubrulle-fagnoni',  'DUBRULLE FAGNONI', 'Alex', 'Codeur', '07 71 47 57 23', '215 Avenue Victor Hugo Le Grand Chapitôt', '04 45 75 25 94', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('clot@user.fr', 'clot', 'CLOT', 'Amaury', 'Patron', '07 78 45 48 43', '31 Avenue Victor Hugo Le Grand Chapitôt', '04 45 85 25 10', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('chabaud@user.fr', 'chabaud', 'CHABAUD', 'Fabien', 'Bourreau', '06 71 42 57 83', '177 Avenue Victor Hugo Le Grand Chapitôt', '04 45 45 21 93', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('girbau@user.fr', 'girbau', 'GIRBAU', 'Laëtitia', 'Patronne', '06 78 15 78 53', '377 Avenue Victor Hugo Le Grand Chapitôt', '04 15 84 25 93', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 1),
('denneulin@user.fr', 'denneulin', 'DENNEULIN', 'Thomas', 'Codeur', '06 74 31 58 73', '757 Avenue Victor Hugo Le Grand Chapitôt', '04 47 85 25 93', '$argon2id$v=19$m=65536,t=5,p=1$5H/CLxn+97eP5lY2kSTDyw$24st+htVb3LlVsxztRlpuaxUdkzRQPN4VAedxtHBpBs', 0);

INSERT INTO demand (Title, Deadline, Content, Utility, Context, Benefice, Inconvenience, Complement, Statut, Note, userId)
VALUES
('TITRE DE NOTRE DECISION 1', '2023-07-31', 'Il faut meubler donc je meuyble avec du texte qui nest pourtant pas du meuble mais bien du meublage', 'Voir une demande en attente', 'En attente de vote', 'Il y a des benefices a prendre des decision', 'Mais il y a aussi des risques a prendre', 'je complète', 'EN ATTENTE DE VOTE', '4', 1),
('DECISION 2', '2023-07-31', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Voir une demande en désaccord', 'En désaccord', 'Il y a des benefices a prendre des decision', 'Mais il y a aussi des risques a prendre', 'je ne suis pas daccord', 'EN DESACCORD', '5', 2),
('VOICI UN TITRE VALIDE', '2023-07-31', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Voir une demande en validée', 'Validée', 'Il y a des benefices a prendre des decision','Mais il y a aussi des risques a prendre', 'je ne suis pas daccord', 'EN DESACCORD', '3', 2);
