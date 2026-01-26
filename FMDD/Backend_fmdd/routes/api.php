<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\AproposController;
use App\Http\Controllers\Api\V1\BlogController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\Api\V1\AdherentController;
use App\Http\Controllers\Api\V1\AdminController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\EventRegistrationController;
use App\Http\Controllers\Api\V1\Admin\AdminEventController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\DemandeBenevolatController;
use App\Http\Controllers\Api\V1\DemandePartenariatProjetController;
use App\Http\Controllers\Api\V1\DemandeSponsoringProjetController;
use App\Http\Controllers\Api\V1\CandidatureController;
use App\Http\Controllers\Api\V1\NewsletterController;

// ✅ ADDED MISSING IMPORTS
use App\Http\Controllers\Api\V1\FormationController;
use App\Http\Controllers\Api\V1\FormationInscriptionController;
use App\Http\Controllers\Api\V1\InsertionController;
use App\Http\Controllers\Api\V1\ProjetController;
use App\Http\Controllers\Api\V1\TemoignageController;

// Routes publiques avec middleware web pour la newsletter
Route::middleware(['web'])->group(function () {
    Route::prefix('v1')->group(function () {
        Route::post('/newsletter/subscribe', [NewsletterController::class, 'store']);
        Route::post('/newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe']);
        Route::post('/newsletter/resubscribe', [NewsletterController::class, 'resubscribe']);
        Route::get('/newsletter', [NewsletterController::class, 'index']);
        Route::delete('/newsletter/{id}', [NewsletterController::class, 'destroy']);
    });
});

// Autres routes publiques
Route::prefix('v1')->group(function () {
    Route::get('/projets', [ProjetController::class, 'index']);
    Route::get('/projets/{id}', [ProjetController::class, 'show']);

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/contact', [ContactController::class, 'index']);
    Route::get('/contact/info', [ContactController::class, 'getInfoContact']);
    Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:contact');
    Route::get('/formations', [FormationController::class, 'index']);
    Route::get('/formations/{id}', [FormationController::class, 'show']);
    
    // Routes de la galerie publiques
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::get('/gallery/categories', [GalleryController::class, 'categories']);
    Route::get('/gallery/{id}', [GalleryController::class, 'show']);

    // Routes candidatures (CRUD public)
    Route::apiResource('candidatures', CandidatureController::class);

    // Routes À propos (publiques)
    Route::prefix('apropos')->group(function () {
        Route::get('/', [AproposController::class, 'index']);
        Route::get('/infos', [AproposController::class, 'getInfosGenerales']);
        Route::get('/equipe', [AproposController::class, 'getEquipe']);
        Route::get('/objectifs', [AproposController::class, 'getObjectifs']);
        Route::get('/histoire', [AproposController::class, 'getHistoire']);
        Route::get('/partenaires', [AproposController::class, 'getPartenaires']);
        Route::get('/services-profils', [AproposController::class, 'getServicesProfils']);
    });

    // Routes Blog (publiques)
    Route::prefix('blog')->group(function () {
        Route::get('/', [BlogController::class, 'index']);
        Route::get('/populaires', [BlogController::class, 'populaires']);
        Route::get('/tags', [BlogController::class, 'tags']);
        Route::get('/{slug}', [BlogController::class, 'show']);
    });

    // Routes Événements (publiques)
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{id}', [EventController::class, 'show']);

    // Routes Projets (publiques)
    Route::prefix('projets')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\V1\ProjetController::class, 'index']);
        Route::get('/{id}', [\App\Http\Controllers\Api\V1\ProjetController::class, 'show']);
        Route::post('/{id}/partenariat', [DemandePartenariatProjetController::class, 'store']);
        Route::post('/{id}/sponsoring', [DemandeSponsoringProjetController::class, 'store']);
        Route::post('/{id}/check-partenariat', [DemandePartenariatProjetController::class, 'checkExisting']);
        Route::post('/{id}/check-sponsoring', [DemandeSponsoringProjetController::class, 'checkExisting']);
    });

    Route::post('/payments/webhook', [PaymentController::class, 'webhook']);
     Route::post('/formations/inscription', [FormationInscriptionController::class,'store']);
});

// ========== ROUTES PROTÉGÉES ==========
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
   Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('projets', ProjetController::class)->except(['index','show']);
    });
    Route::prefix('adherent')->group(function () {
        Route::get('/profile', [AdherentController::class, 'profile']);
        Route::put('/profile', [AdherentController::class, 'updateProfile']);
        Route::post('/initial-profile', [AdherentController::class, 'createInitialProfile']);
        Route::get('/payments', [AdherentController::class, 'payments']);
        Route::get('/', [AdherentController::class, 'index']);
        Route::get('/{id}', [AdherentController::class, 'show']);
        Route::post('/', [AdherentController::class, 'store']);
        Route::delete('/{id}', [AdherentController::class, 'destroy']);
    });

    // ✅ ROUTES ADMIN CORRIGÉES
    Route::middleware(['role:admin'])->group(function () {
        // Fix 1: Stats URL (Handle BOTH paths to be safe)
        Route::get('/stats', [AdminController::class, 'stats']);       // api/v1/stats
        Route::get('/admin/stats', [AdminController::class, 'stats']); // api/v1/admin/stats

        // Fix 2: Resources (Map Frontend names to Backend Controllers)
        Route::apiResource('formations', FormationController::class)->except(['index','show']);
        Route::apiResource('projets', ProjetController::class)->except(['index','show']);
        
        Route::apiResource('insertions', InsertionController::class);
        Route::apiResource('temoignages', TemoignageController::class);
        Route::apiResource('evenements', EventController::class)->except(['index','show']); // Frontend calls it 'evenements'
        
        // 👇👇 THIS WAS THE MISSING LINE FOR PROJECTS 👇👇

        Route::prefix('admin')->group(function () {
            Route::get('/adherents', [AdminController::class, 'adherents']);
            Route::get('/payments', [AdminController::class, 'payments']);
        });
    });

    Route::prefix('events')->group(function () {
        Route::post('/{event}/register', [EventRegistrationController::class, 'register']);
        Route::get('/my/registrations', [EventRegistrationController::class, 'myRegistrations']);
        Route::prefix('payments')->group(function () {
            Route::post('/{registration}/initiate', [PaymentController::class, 'initiatePayment']);
            Route::get('/status/{paymentReference}', [PaymentController::class, 'checkPaymentStatus']);
        });
    });

    Route::prefix('projets')->group(function () {
        Route::post('/{id}/benevolat', [DemandeBenevolatController::class, 'store']);
        Route::get('/{id}/benevoles', [DemandeBenevolatController::class, 'index']);
        Route::get('/{id}/my-benevolat-request', [DemandeBenevolatController::class, 'checkMyRequest']);
        Route::get('/{id}/demandes-partenariat', [DemandePartenariatProjetController::class, 'index']);
        Route::get('/{id}/demandes-sponsoring', [DemandeSponsoringProjetController::class, 'index']);
    });


    Route::middleware(['role:admin'])->group(function () {
        Route::post('/gallery', [GalleryController::class, 'store']);
        Route::put('/gallery/{id}', [GalleryController::class, 'update']);
        Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);
        Route::post('/gallery/reorder', [GalleryController::class, 'reorder']);
    });

    Route::middleware(['role:admin'])->prefix('admin/events')->group(function () {
        Route::get('/pending-registrations', [AdminEventController::class, 'pendingRegistrations']);
        Route::get('/{event}/pending-registrations', [AdminEventController::class, 'pendingRegistrations']);
        Route::put('/registrations/{registration}/status', [AdminEventController::class, 'updateRegistrationStatus']);
    });

    Route::middleware(['role:admin'])->prefix('blog')->group(function () {
        Route::post('/', [BlogController::class, 'store']);
        Route::put('/{id}', [BlogController::class, 'update']);
        Route::delete('/{id}', [BlogController::class, 'destroy']);
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::post('/benevoles/{benevole_id}/valider', [DemandeBenevolatController::class, 'valider']);
        Route::post('/benevoles/ajouter', [DemandeBenevolatController::class, 'ajouter']);
        Route::post('/demandes-partenariat/{demande_id}/valider', [DemandePartenariatProjetController::class, 'valider']);
        Route::post('/demandes-sponsoring/{demande_id}/valider', [DemandeSponsoringProjetController::class, 'valider']);
    });

    Route::middleware('role:super_admin')->group(function () {
        // Routes super admin
    });
  

});