# Suivi des Tables de la Base de Données

## Tables Principales
| Nom de la Table | Migration Créée | Table Existe en BD | Modèle Créé | Relations Configurées |
|----------------|-----------------|-------------------|-------------|---------------------|
| users | ✅ | ✅ | ✅ | ✅ |
| evenements | ❌ | ❌ | ❌ | ❌ |
| projets | ❌ | ❌ | ❌ | ❌ |
| insertions_pro | ❌ | ❌ | ❌ | ❌ |
| blog | ❌ | ❌ | ❌ | ❌ |
| newsletters | ❌ | ❌ | ❌ | ❌ |
| galerie | ❌ | ❌ | ❌ | ❌ |
| info_contact | ✅ | ✅ | ✅ | ✅ |
| apropos | ✅ | ❌ | ✅ | ✅ |
| equipe_fmdd | ✅ | ❌ | ✅ | ✅ |
| objectifs | ✅ | ❌ | ✅ | ✅ |
| actualites | ❌ | ❌ | ❌ | ❌ |
| services | ❌ | ❌ | ❌ | ❌ |
| histoire | ✅ | ❌ | ✅ | ✅ |
| partenaires | ✅ | ❌ | ✅ | ✅ |
| sponsors | ❌ | ❌ | ❌ | ❌ |

## Tables Dépendantes de 'users'
| Nom de la Table | Migration Créée | Table Existe en BD | Modèle Créé | Relations Configurées |
|----------------|-----------------|-------------------|-------------|---------------------|
| adherents | ❌ | ❌ | ❌ | ❌ |
| admins | ❌ | ❌ | ❌ | ❌ |
| formateurs | ❌ | ❌ | ❌ | ❌ |
| members | ❌ | ❌ | ❌ | ❌ |
| feedback | ❌ | ❌ | ❌ | ❌ |
| user_settings | ❌ | ❌ | ❌ | ❌ |
| courses | ❌ | ❌ | ❌ | ❌ |
| learners | ❌ | ❌ | ❌ | ❌ |
| contact_us | ✅ | ✅ | ✅ | ✅ |
| formulaire_temoignage | ❌ | ❌ | ❌ | ❌ |
| availabilities | ❌ | ❌ | ❌ | ❌ |
| instructors | ❌ | ❌ | ❌ | ❌ |
| sessions | ❌ | ❌ | ❌ | ❌ |
| paiements | ❌ | ❌ | ❌ | ❌ |

## Tables Dépendantes de 'evenements'
| Nom de la Table | Migration Créée | Table Existe en BD | Modèle Créé | Relations Configurées |
|----------------|-----------------|-------------------|-------------|---------------------|
| intervenants | ❌ | ❌ | ❌ | ❌ |
| evenements_sponsors | ❌ | ❌ | ❌ | ❌ |
| demandes_sponsoring_evenement | ❌ | ❌ | ❌ | ❌ |

## Tables Dépendantes de 'projets'
| Nom de la Table | Migration Créée | Table Existe en BD | Modèle Créé | Relations Configurées |
|----------------|-----------------|-------------------|-------------|---------------------|
| demandes_benevolat | ❌ | ❌ | ❌ | ❌ |
| demandes_financement | ❌ | ❌ | ❌ | ❌ |
| projets_partenaires | ❌ | ❌ | ❌ | ❌ |
| demandes_partenariat_projet | ❌ | ❌ | ❌ | ❌ |
| projets_sponsors | ❌ | ❌ | ❌ | ❌ |
| demandes_sponsoring_projet | ❌ | ❌ | ❌ | ❌ |

## Tables Dépendantes de 'courses'
| Nom de la Table | Migration Créée | Table Existe en BD | Modèle Créé | Relations Configurées |
|----------------|-----------------|-------------------|-------------|---------------------|
| certificates | ❌ | ❌ | ❌ | ❌ |
| course_learner | ❌ | ❌ | ❌ | ❌ |
| comments | ❌ | ❌ | ❌ | ❌ |
| quizzes | ❌ | ❌ | ❌ | ❌ |
| lessons | ❌ | ❌ | ❌ | ❌ |
| inscriptions_formations | ❌ | ❌ | ❌ | ❌ |

## Tables Dépendantes Multiples
| Nom de la Table | Migration Créée | Table Existe en BD | Modèle Créé | Relations Configurées |
|----------------|-----------------|-------------------|-------------|---------------------|
| benevoles | ❌ | ❌ | ❌ | ❌ |
| financeurs | ❌ | ❌ | ❌ | ❌ |
| projets_benevoles | ❌ | ❌ | ❌ | ❌ |
| projets_financeurs | ❌ | ❌ | ❌ | ❌ |

## API Endpoints Configurés
| Endpoint | Méthode | Controller | Validation | Documentation |
|----------|---------|------------|------------|---------------|
| /api/v1/contact | GET | ✅ | N/A | ✅ |
| /api/v1/contact | POST | ✅ | ✅ | ✅ |
| /api/v1/apropos | GET | ✅ | N/A | ✅ |
| /api/v1/apropos/infos | GET | ✅ | N/A | ✅ |
| /api/v1/apropos/equipe | GET | ✅ | N/A | ✅ |
| /api/v1/apropos/objectifs | GET | ✅ | N/A | ✅ |
| /api/v1/apropos/histoire | GET | ✅ | N/A | ✅ |
| /api/v1/apropos/partenaires | GET | ✅ | N/A | ✅ |

## Légende
- ❌ : Non fait
- ✅ : Fait
- 🔄 : En cours
- ⚠️ : Problème à résoudre 