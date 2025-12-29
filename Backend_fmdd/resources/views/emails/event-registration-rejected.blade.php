@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            {{ config('app.name') }}
        @endcomponent
    @endslot

    # Désolé, votre inscription n'a pas été retenue

    Bonjour {{ $registration->full_name }},

    Nous vous remercions de votre intérêt pour l'événement **{{ $event->titre }}**.

    Malheureusement, nous ne pouvons pas retenir votre inscription pour le moment en raison d'un nombre limité de places disponibles.

    **Détails de l'événement :**
    - Date : {{ \Carbon\Carbon::parse($event->date)->format('d/m/Y') }}
    - Heure : {{ $event->heure }}
    - Lieu : {{ $event->ville }}

    Nous vous remercions de votre compréhension et espérons vous accueillir lors d'un prochain événement.

    Cordialement,
    L'équipe {{ config('app.name') }}

    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
            © {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés.
        @endcomponent
    @endslot
@endcomponent
