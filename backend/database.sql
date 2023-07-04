CREATE TABLE user (
    Id INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL,
    Lastname VARCHAR(50) DEFAULT `Doe`,
    Firstname VARCHAR(50) DEFAULT `John`,
    Password VARCHAR(50) DEFAULT `12345678`,
    Admin TINYINT DEFAULT `0`,
    PRIMARY KEY (Id);
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
    Statut ENUM(`EN ATTENTE DE VOTE`, `EN DESACCORD`, `VALIDE`, `MISE EN PLACE`, `ARCHIVE`, `QUARANTAINE`) DEFAULT `EN ATTENTE DE VOTE`,
    Note FLOAT,
    user_Id INT NOT NULL,
    CONSTRAINT fk_demand_user
    FOREIGN KEY (user_Id)
    REFERENCES user(Id)
);

CREATE TABLE interaction (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Content TEXT,
  Note FLOAT,
  user_Id INT NOT NULL,
  demand_Id INT NOT NULL,
  CONSTRAINT fk_interaction_user
  FOREIGN KEY (user_Id)
  REFERENCES user(Id),
  CONSTRAINT fk_interaction_demand
  FOREIGN KEY (demand_Id)
  REFERENCES demand(Id)
);

CREATE TABLE stakeholder (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Role ENUM(`ADMIN`, `EXPERT`, `SALARIE`, `BENEVOLE`) DEFAULT `ADMIN`,
  user_Id INT NOT NULL,
  demand_Id INT NOT NULL,
  CONSTRAINT fk_stakeholder_user
  FOREIGN KEY (user_Id)
  REFERENCES user(Id),
  CONSTRAINT fk_stakeholder_demand
  FOREIGN KEY (demand_Id)
  REFERENCES demand(Id)
);

INSERT INTO user (Email, Lastname, Firstname, Password, Admin)
VALUES
(`user@user.fr`, `DUPONT`, `Francois`, `user1234`, 1),
(`dubrulle-fagnoni@user.fr`, `DUBRULLE FAGNONI`, `Alex`, `user1234`, 1),
(`clot@user.fr`, `CLOT`, `Amaury`, `user1234`, 1),
(`chabaud@user.fr`, `CHABAUD`, `Fabien`, `user1234`, 1),
(`girbau@user.fr`, `GIRBAU`, `Laëtitia`, `user1234`, 1),
(`denneulin@user.fr`, `DENNEULIN`, `Thomas`, `user1234`, 0)
;

INSERT INTO demand (Title, Deadline, Content, Utility, Context, Benefice, Inconvenience, Complement, Statut, Note, user_Id)
VALUES
(`Lorem_Attente`, `31/07/2023`, `Ceci est une demande en attente`, `Voir une demande en attente`, `En attente de vote`, `+++`, `---`, `je complète`, `EN ATTENTE DE DE VOTE`,1),
(`Lorem_désaccord`, `31/07/2023`, `Ceci est une demande en désaccord`, `Voir une demande en désaccord`, `En désaccord`, `+++`, `---`, `je ne suis pas daccord`, `EN DESACCORD`,2),
(`Lorem_validée`, `31/07/2023`, `Ceci est une demande validée`, `Voir une demande en validée`, `Validée`, `+++`, `---`, `c'est validé`, `VALIDE`,3),
(`Lorem_mise_en_place`, `31/07/2023`, `Ceci est une demande mise en palce`, `Voir une demande mise en place`, `Mise en place`, `+++`, `---`, `c'est mis en place`, `MISE EN PLACE`,4),
(`Lorem_archive`, `31/07/2023`, `Ceci est une demande archivée`, `Voir une demande en archivée`, `Archivée`, `+++`, `---`, `c'est archive`, `VALIDE`,5),
(`Lorem_quarantaine`, `31/07/2023`, `Ceci est une demande mise en quarantaine`, `Voir une demande en quarantaine`, `Mise en quarantaine`, `+++`, `---`, `c'est mis en quarantaine`, `QUARANTAINE`,6);