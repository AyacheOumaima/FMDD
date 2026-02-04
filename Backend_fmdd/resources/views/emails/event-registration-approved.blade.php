@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            {{ config('app.name') }}
        @endcomponent
    @endslot

    # Confirmation d'inscription

    Bonjour {{ $registration->full_name }},

    Votre inscription à l'événement **{{ $event->titre }}** a été approuvée avec succès.

    **Détails de l'événement :**
    - Date : {{ \Carbon\Carbon::parse($event->date)->format('d/m/Y') }}
    - Heure : {{ $event->heure }}
    - Lieu : {{ $event->ville }}

    @if($event->type_evenement === 'payant' && $registration->statut_paiement === 'en attente')
        Un email séparé vous sera envoyé avec les instructions de paiement.
    @endif

    Merci de votre confiance !

    Cordialement,
    L'équipe {{ config('app.name') }}

    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
            © {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés.
        @endcomponent
    @endslot
@endcomponent
