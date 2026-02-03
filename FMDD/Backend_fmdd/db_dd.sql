-- Désactiver temporairement les vérifications de clés étrangères pour permettre la création des tables dans n'importe quel ordre,
-- bien que l'ordre ci-dessous soit déjà optimisé.
SET FOREIGN_KEY_CHECKS = 0;

-- Tables principales sans dépendances de clés étrangères sortantes ou avec des dépendances circulaires gérées par SET FOREIGN_KEY_CHECKS = 0
CREATE TABLE users (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255) DEFAULT NULL,
    role ENUM('learner','instructor','admin', 'adherent') NOT NULL DEFAULT 'learner',
    avatar VARCHAR(255) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    remember_token VARCHAR(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE evenements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_a_venir BOOLEAN DEFAULT FALSE,
    date_limite_d_inscription DATE NOT NULL,
    heure_limite_d_inscription TIME NOT NULL,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    ville VARCHAR(100) NOT NULL,
    image VARCHAR(255) NULL,
    prix DECIMAL(10, 2) NULL,
    categorie VARCHAR(100) NULL,
    description_detaillee TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE projets (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titre_projet VARCHAR(255),
    description_projet TEXT,
    theme VARCHAR(255) NULL,
    date_projet TIMESTAMP NULL DEFAULT NULL,
    statut_projet VARCHAR(100) NULL,
    image VARCHAR(255) NULL,
    description_detaillee TEXT,
    organisateur VARCHAR(255) NULL,
    localisation VARCHAR(255),
    duree VARCHAR(100),
    image_partenaire VARCHAR(255) NULL,
    objectif_projet TEXT NULL,
    grande_description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE insertions_pro (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    entreprise VARCHAR(255),
    ville VARCHAR(100),
    date DATE,
    type_contrat VARCHAR(100),
    experience TEXT,
    salaire VARCHAR(100),
    description_projet TEXT,
    profil_recherche TEXT,
    grand_titre VARCHAR(255),
    grande_description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE blog (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255),
    commentaire TEXT,
    date DATE,
    auteur VARCHAR(100),
    image VARCHAR(255),
    video VARCHAR(255),
    description_blog TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE newsletters ( -- Consolidated from newsletters and newsletter_subscriptions
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    desabonement_date DATETIME,
    statut ENUM('actif', 'desabonné') DEFAULT 'actif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE galerie (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255),
    description TEXT,
    categorie VARCHAR(100),
    is_a_la_une BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE info_contact (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    adresse_fmdd TEXT,
    telephone_fmdd VARCHAR(20),
    email_fmdd VARCHAR(100),
    horaire_fmdd VARCHAR(100),
    localisation_fmdd TEXT,
    url_whatsapp VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE apropos (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image_president VARCHAR(255),
    texte_president TEXT,
    nom_president VARCHAR(100),
    mission TEXT,
    vision TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE equipe_fmdd (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    linkedin VARCHAR(255),
    email VARCHAR(191) UNIQUE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE objectifs (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255),
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE actualites (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255),
    image VARCHAR(255),
    description TEXT NOT NULL,
    description_detaillee TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE services (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profil VARCHAR(100),
    service TEXT,
    modalite TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE histoire (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    annee YEAR,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ghassane_test_instructors (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE info_temoignage (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Titre VARCHAR(255),
    Description VARCHAR(255),
    Image_url VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE partenaires (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    site_web VARCHAR(255),
    secteur VARCHAR(100),
    description TEXT,
    contact_nom VARCHAR(100),
    contact_email VARCHAR(100),
    date_debut_collaboration DATE,
    statut ENUM('actif', 'inactif') DEFAULT 'actif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sponsors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255),
    logo VARCHAR(255),
    site_web VARCHAR(255),
    secteur VARCHAR(100),
    description TEXT,
    contact_nom VARCHAR(100),
    contact_email VARCHAR(100),
    date_debut_collaboration DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tables dépendantes de 'users'
CREATE TABLE adherents (
    user_id BIGINT(20) UNSIGNED PRIMARY KEY,
    numero_adherent VARCHAR(20) UNIQUE NOT NULL,
    date_adhesion DATE NOT NULL,
    date_expiration DATE NOT NULL,
    statut_cotisation ENUM('payée', 'en attente', 'expirée') NOT NULL,
    montant_cotisation DECIMAL(10,2) DEFAULT 500.00,
    mode_paiement VARCHAR(50),
    reference_paiement VARCHAR(100),
    date_dernier_paiement DATE,
    avantages_specifiques TEXT,
    CONSTRAINT FK_Adherents_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admins (
    user_id BIGINT(20) UNSIGNED PRIMARY KEY,
    fonction VARCHAR(100),
    departement VARCHAR(100),
    CONSTRAINT FK_Admins_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE formateurs (
    user_id BIGINT(20) UNSIGNED PRIMARY KEY,
    specialite VARCHAR(255),
    biographie TEXT,
    tarif_horaire DECIMAL(10,2),
    disponibilite TEXT,
    CONSTRAINT FK_Formateurs_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE members (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    learner_id BIGINT(20) UNSIGNED NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('male','female','other','prefer_not_to_say') NOT NULL,
    phone VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    current_status VARCHAR(255) NOT NULL,
    education_level VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(100) NOT NULL,
    interests LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(interests)),
    motivation TEXT NOT NULL,
    previously_participated TINYINT(1) NOT NULL,
    hear_about_us LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(hear_about_us)),
    receive_newsletter TINYINT(1) NOT NULL,
    cv_path VARCHAR(255) NOT NULL,
    cin_path VARCHAR(255) NULL,
    motivation_letter_path VARCHAR(255) DEFAULT NULL,
    data_consent TINYINT(1) NOT NULL,
    values_consent TINYINT(1) NOT NULL,
    payment_mode ENUM('online','bank_transfer') DEFAULT NULL,
    payment_proof_path VARCHAR(255) DEFAULT NULL,
    payment_reference VARCHAR(255) DEFAULT NULL,
    payment_date TIMESTAMP NULL DEFAULT NULL,
    has_paid TINYINT(1) NOT NULL DEFAULT 0,
    fmdd_consent TINYINT(1) NOT NULL DEFAULT 0,
    payment_status ENUM('pending','approved','rejected') DEFAULT NULL,
    status ENUM('pending_payment','payment_received','completed') NOT NULL DEFAULT 'pending_payment',
    registration_date TIMESTAMP NULL DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT FK_Members_LearnerId_Users FOREIGN KEY (learner_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE feedback (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    type_feedback ENUM('Suggestion', 'Problème technique', 'Question', 'Autre') NOT NULL,
    message TEXT NOT NULL,
    satisfaction INT NULL COMMENT 'Niveau de satisfaction de 1 à 5',
    CONSTRAINT FK_Feedback_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_settings (
    user_id BIGINT(20) UNSIGNED PRIMARY KEY,
    language_preference VARCHAR(10) DEFAULT 'fr',
    notification_enabled BOOLEAN DEFAULT FALSE,
    CONSTRAINT FK_UserSettings_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE courses (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    instructor_id BIGINT(20) UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    course_thumbnail VARCHAR(255) DEFAULT NULL,
    level ENUM('débutant','intermédiaire','avancé') DEFAULT 'débutant',
    programme TEXT NULL,
    avantage TEXT NULL,
    url_vers_site VARCHAR(255),
    students INT(11) NOT NULL DEFAULT 0,
    rating DOUBLE DEFAULT NULL,
    duration_hours DECIMAL(5, 2) NOT NULL,
    prix DECIMAL(5, 2) NOT NULL,
    date_de_creation TIMESTAMP NULL DEFAULT NULL,
    categorie VARCHAR(100),
    is_a_la_une BOOLEAN DEFAULT FALSE,
    CONSTRAINT FK_Courses_InstructorId_Users FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE learners (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED NOT NULL,
    courses_enrolled INT(11) NOT NULL DEFAULT 0,
    courses_completed INT(11) NOT NULL DEFAULT 0,
    last_connection TIMESTAMP NULL DEFAULT NULL,
    CONSTRAINT FK_Learners_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contact_us (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED,
    nom_complet VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    objet VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    statut ENUM('non_lu','lu','repondu') DEFAULT 'non_lu',
    CONSTRAINT FK_ContactUs_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE formulaire_temoignage (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED NULL,
    message TEXT NOT NULL,
    role_user VARCHAR(100),
    statut ENUM('approuvé','refusé','en attente'),
    CONSTRAINT FK_FormulaireTemoignage_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE availabilities (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    instructor_id BIGINT(20) UNSIGNED NOT NULL,
    day VARCHAR(255) NOT NULL,
    slots LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(slots)),
    CONSTRAINT FK_Availabilities_InstructorId_Users FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE instructors (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED NOT NULL,
    skills LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(skills)),
    languages LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(languages)),
    certifications LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(certifications)),
    availability LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(availability)),
    bank_info TEXT DEFAULT NULL,
    CONSTRAINT FK_Instructors_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED DEFAULT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INT(11) NOT NULL,
    CONSTRAINT FK_Sessions_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE paiements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NULL,
    payer_name VARCHAR(100),
    payer_email VARCHAR(150),
    montant DECIMAL(10,2) NOT NULL,
    date_paiement DATETIME DEFAULT CURRENT_TIMESTAMP,
    raison ENUM('formation', 'evenement', 'projet', 'partenariat', 'soutien', 'don', 'autre') NOT NULL,
    reference_id INT NULL,
    statut ENUM('en_attente', 'effectué', 'échoué', 'remboursé') DEFAULT 'en_attente',
    methode_paiement VARCHAR(50),
    reference_externe VARCHAR(100),
    description TEXT,
    CONSTRAINT FK_Paiements_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tables dépendantes de 'evenements'
CREATE TABLE intervenants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evenement_id BIGINT UNSIGNED NOT NULL,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    fonction VARCHAR(100),
    email VARCHAR(191) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    biographie TEXT,
    photo VARCHAR(255),
    CONSTRAINT FK_Intervenants_EvenementId_Evenements FOREIGN KEY (evenement_id) REFERENCES evenements(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE evenements_sponsors (
    evenement_id BIGINT UNSIGNED,
    sponsor_id INT,
    type_sponsoring VARCHAR(100),
    montant DECIMAL(15,2),
    contreparties TEXT,
    PRIMARY KEY (evenement_id, sponsor_id),
    CONSTRAINT FK_EvenementsSponsors_EvenementId_Evenements FOREIGN KEY (evenement_id) REFERENCES evenements(id) ON DELETE CASCADE,
    CONSTRAINT FK_EvenementsSponsors_SponsorId_Sponsors FOREIGN KEY (sponsor_id) REFERENCES sponsors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE demandes_sponsoring_evenement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organisation VARCHAR(255),
    contact_nom VARCHAR(100),
    email VARCHAR(100),
    telephone VARCHAR(20),
    evenement_id BIGINT UNSIGNED,
    type_sponsoring_souhaite VARCHAR(100),
    montant_propose DECIMAL(15,2),
    contreparties_demandees TEXT,
    date_demande DATE,
    statut ENUM('En attente', 'Approuvée', 'Rejetée'),
    CONSTRAINT FK_DemandesSponsoringEvenement_EvenementId_Evenements FOREIGN KEY (evenement_id) REFERENCES evenements(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tables dépendantes de 'projets'
CREATE TABLE demandes_benevolat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NULL,
    projet_id BIGINT(20) UNSIGNED,
    competences TEXT,
    disponibilite TEXT,
    motivation TEXT,
    date_demande DATE,
    statut ENUM('En attente', 'Approuvée', 'Rejetée'),
    CONSTRAINT FK_DemandesBenevolat_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT FK_DemandesBenevolat_ProjetId_Projets FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE demandes_financement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organisme VARCHAR(255),
    contact_nom VARCHAR(100),
    email VARCHAR(100),
    telephone VARCHAR(20),
    projet_id BIGINT(20) UNSIGNED,
    montant_demande DECIMAL(15,2),
    description_usage TEXT,
    date_demande DATE,
    statut ENUM('En attente', 'Approuvée', 'Rejetée'),
    CONSTRAINT FK_DemandesFinancement_ProjetId_Projets FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE projets_partenaires (
    projet_id BIGINT(20) UNSIGNED,
    partenaire_id INT,
    type_partenariat VARCHAR(100),
    engagement TEXT,
    date_debut DATE,
    date_fin DATE,
    PRIMARY KEY (projet_id, partenaire_id),
    CONSTRAINT FK_ProjetsPartenaires_ProjetId_Projets FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE,
    CONSTRAINT FK_ProjetsPartenaires_PartenaireId_Partenaires FOREIGN KEY (partenaire_id) REFERENCES partenaires(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE demandes_partenariat_projet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organisation VARCHAR(255),
    contact_nom VARCHAR(100),
    email VARCHAR(100),
    telephone VARCHAR(20),
    projet_id BIGINT(20) UNSIGNED,
    type_partenariat_souhaite VARCHAR(100),
    engagement_propose TEXT,
    retour_demande TEXT,
    date_demande DATE,
    statut ENUM('En attente', 'Approuvée', 'Rejetée') DEFAULT 'En attente',
    CONSTRAINT FK_DemandesPartenariatProjet_ProjetId_Projets FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE projets_sponsors (
    projet_id BIGINT(20) UNSIGNED,
    sponsor_id INT,
    type_sponsoring VARCHAR(100),
    montant DECIMAL(15,2),
    contreparties TEXT,
    date_debut DATE,
    date_fin DATE,
    PRIMARY KEY (projet_id, sponsor_id),
    CONSTRAINT FK_ProjetsSponsors_ProjetId_Projets FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE,
    CONSTRAINT FK_ProjetsSponsors_SponsorId_Sponsors FOREIGN KEY (sponsor_id) REFERENCES sponsors(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE demandes_sponsoring_projet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organisation VARCHAR(255),
    contact_nom VARCHAR(100),
    email VARCHAR(100),
    telephone VARCHAR(20),
    projet_id BIGINT(20) UNSIGNED,
    type_sponsoring_souhaite VARCHAR(100),
    montant_propose DECIMAL(15,2),
    contreparties_demandees TEXT,
    date_demande DATE,
    statut ENUM('En attente', 'Approuvée', 'Rejetée'),
    CONSTRAINT FK_DemandesSponsoringProjet_ProjetId_Projets FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tables dépendantes de 'courses' (formations)
CREATE TABLE certificates (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT(20) UNSIGNED,
    formation_id BIGINT(20) UNSIGNED, -- Renommé de formations à courses
    title VARCHAR(100) NOT NULL,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_url VARCHAR(255),
    CONSTRAINT FK_Certificates_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT FK_Certificates_FormationId_Courses FOREIGN KEY (formation_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE course_learner (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    learner_id BIGINT(20) UNSIGNED NOT NULL,
    course_id BIGINT(20) UNSIGNED NOT NULL,
    progress INT(10) UNSIGNED NOT NULL DEFAULT 0,
    last_accessed TIMESTAMP NULL DEFAULT NULL,
    enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT FK_CourseLearner_LearnerId_Learners FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
    CONSTRAINT FK_CourseLearner_CourseId_Courses FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE comments (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    instructor_id BIGINT(20) UNSIGNED NOT NULL,
    course_id BIGINT(20) UNSIGNED NOT NULL, -- Renommé de formations à courses
    user VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    rating TINYINT(3) UNSIGNED NOT NULL,
    CONSTRAINT FK_Comments_InstructorId_Users FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT FK_Comments_CourseId_Courses FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE quizzes (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT(20) UNSIGNED NOT NULL, -- Renommé de formations à courses
    title VARCHAR(255) NOT NULL,
    isFinal TINYINT(1) NOT NULL,
    questions LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(questions)),
    CONSTRAINT FK_Quizzes_CourseId_Courses FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE lessons (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT(20) UNSIGNED NOT NULL, -- Renommé de formations à courses
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    duration VARCHAR(255) DEFAULT NULL,
    `order` INT(10) UNSIGNED NOT NULL DEFAULT 0,
    CONSTRAINT FK_Lessons_CourseId_Courses FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE inscriptions_formations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NOT NULL,
    formation_id BIGINT(20) UNSIGNED NOT NULL, -- Renommé de formations à courses
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en attente','inscrit', 'en_cours', 'terminé', 'abandonné') NOT NULL,
    paiement_id INT,
    progression INT DEFAULT 0,
    certificat_obtenu BOOLEAN DEFAULT FALSE,
    last_access DATETIME,
    date_obtention_certificat DATE,
    notes TEXT,
    CONSTRAINT FK_InscriptionsFormations_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT FK_InscriptionsFormations_FormationId_Courses FOREIGN KEY (formation_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT FK_InscriptionsFormations_PaiementId_Paiements FOREIGN KEY (paiement_id) REFERENCES paiements(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tables dépendantes de 'demandes_benevolat'
CREATE TABLE benevoles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NULL,
    demande_id INT,
    date_approbation DATE,
    CONSTRAINT FK_Benevoles_UserId_Users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT FK_Benevoles_DemandeId_DemandesBenevolat FOREIGN KEY (demande_id) REFERENCES demandes_benevolat(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tables dépendantes de 'demandes_financement'
CREATE TABLE financeurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255),
    logo VARCHAR(255),
    site_web VARCHAR(255),
    secteur VARCHAR(100),
    demande_id INT,
    date_approbation DATE,
    CONSTRAINT FK_Financeurs_DemandeId_DemandesFinancement FOREIGN KEY (demande_id) REFERENCES demandes_financement(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tables dépendantes de 'benevoles' et 'projets'
CREATE TABLE projets_benevoles (
    projet_id BIGINT(20) UNSIGNED,
    benevole_id INT,
    role VARCHAR(100),
    date_debut DATE,
    date_fin DATE,
    heures_effectuees INT,
    PRIMARY KEY (projet_id, benevole_id),
    CONSTRAINT FK_ProjetsBenevoles_ProjetId_Projets FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE,
    CONSTRAINT FK_ProjetsBenevoles_BenevoleId_Benevoles FOREIGN KEY (benevole_id) REFERENCES benevoles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tables dépendantes de 'financeurs' et 'projets'
CREATE TABLE projets_financeurs (
    projet_id BIGINT(20) UNSIGNED,
    financeur_id INT,
    montant DECIMAL(15,2),
    type_financement VARCHAR(100),
    conditions TEXT,
    date_versement DATE,
    PRIMARY KEY (projet_id, financeur_id),
    CONSTRAINT FK_ProjetsFinanceurs_ProjetId_Projets FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE,
    CONSTRAINT FK_ProjetsFinanceurs_FinanceurId_Financeurs FOREIGN KEY (financeur_id) REFERENCES financeurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Réactiver les vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 1;

-- --------
-- 1️⃣ Jeunes diplômés & chercheurs d’emploi
-- INSERT INTO services_profils
-- (profil, services_offerts, modalites_acces, ordre_affichage, actif, created_at, updated_at)
-- VALUES (
--   'Jeunes diplômés & chercheurs d’emploi',
--   '[
--     "Formations certifiantes",
--     "Coaching carrière",
--     "Préparation aux entretiens",
--     "Accès aux offres d’emploi",
--     "Matching profil / emploi"
--   ]',
--   'Inscription sur la plateforme FMDD, création de profil professionnel et adhésion FMDD recommandée',
--   1,
--   1,
--   NOW(),
--   NOW()
-- );

-- 2️⃣ Étudiants & écoles partenaires (B2B)
-- INSERT INTO services_profils
-- (profil, services_offerts, modalites_acces, ordre_affichage, actif, created_at, updated_at)
-- VALUES (
--   'Étudiants des écoles partenaires',
--   '[
--     "Accès gratuit aux formations payantes FMDD",
--     "Certificats de formation",
--     "Participation aux événements FMDD",
--     "Orientation professionnelle"
--   ]',
--   'Accès via abonnement actif de l’établissement partenaire (School Basic / Pro / Premium)',
--   2,
--   1,
--   NOW(),
--   NOW()
-- );

-- 3️⃣ Entrepreneurs & porteurs de projets
-- INSERT INTO services_profils
-- (profil, services_offerts, modalites_acces, ordre_affichage, actif, created_at, updated_at)
-- VALUES (
--   'Entrepreneurs & porteurs de projets',
--   '[
--     "Incubation de projets",
--     "Mentorat entrepreneurial",
--     "Élaboration de business plan",
--     "Recherche de financements",
--     "Mise en réseau avec partenaires"
--   ]',
--   'Dépôt de projet via la plateforme et sélection par le comité FMDD',
--   3,
--   1,
--   NOW(),
--   NOW()
-- );

-- 4️⃣ Recruteurs & entreprises
-- INSERT INTO services_profils
-- (profil, services_offerts, modalites_acces, ordre_affichage, actif, created_at, updated_at)
-- VALUES (
--   'Recruteurs & entreprises',
--   '[
--     "Publication d’offres d’emploi",
--     "Accès à une base de profils qualifiés",
--     "Matching intelligent candidat / poste",
--     "Visibilité marque employeur"
--   ]',
--   'Souscription à un abonnement recruteur via la plateforme FMDD',
--   4,
--   1,
--   NOW(),
--   NOW()
-- );

-- 5️⃣ Adhérents FMDD
-- INSERT INTO services_profils
-- (profil, services_offerts, modalites_acces, ordre_affichage, actif, created_at, updated_at)
-- VALUES (
--   'Adhérents FMDD',
--   '[
--     "Réduction sur les formations",
--     "Priorité aux offres d’emploi",
--     "Accès à des événements exclusifs",
--     "Accompagnement personnalisé"
--   ]',
--   'Adhésion FMDD validée avec paiement en ligne et carte d’adhérent active',
--   5,
--   1,
--   NOW(),
--   NOW()
-- );

-- 6️⃣ Utilisateurs Premium
-- INSERT INTO services_profils
-- (profil, services_offerts, modalites_acces, ordre_affichage, actif, created_at, updated_at)
-- VALUES (
--   'Utilisateurs Premium',
--   '[
--     "Accès total aux formations",
--     "Priorité maximale emploi",
--     "Coaching personnalisé",
--     "Accès gratuit aux événements FMDD"
--   ]',
--   'Souscription à un abonnement Premium mensuel ou annuel',
--   6,
--   1,
--   NOW(),
--   NOW()
-- );