@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            {{ config('app.name') }}
        @endcomponent
    @endslot

    # Paiement de votre inscription

    Bonjour {{ $registration->full_name }},

    Votre inscription à l'événement **{{ $event->titre }}** a été approuvée.
    
    **Montant à régler :** {{ number_format($event->prix, 2, ',', ' ') }} €

    @component('mail::button', ['url' => $paymentLink])
        Payer maintenant
    @endcomponent

    **Détails de l'événement :**
    - Date : {{ \Carbon\Carbon::parse($event->date)->format('d/m/Y') }}
    - Heure : {{ $event->heure }}
    - Lieu : {{ $event->ville }}

    *Ce lien de paiement est valable 7 jours. Passé ce délai, votre inscription pourra être annulée.*

    Cordialement,
    L'équipe {{ config('app.name') }}

    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
            © {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés.
        @endcomponent
    @endslot
@endcomponent
