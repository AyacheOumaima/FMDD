<?php

namespace App\Mail;

use App\Models\EventRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentLinkSent extends Mailable
{
    use Queueable, SerializesModels;

    public $registration;
    public $paymentLink;

    /**
     * Create a new message instance.
     *
     * @param EventRegistration $registration
     * @param string $paymentLink
     * @return void
     */
    public function __construct(EventRegistration $registration, string $paymentLink)
    {
        $this->registration = $registration;
        $this->paymentLink = $paymentLink;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $event = $this->registration->event;
        $subject = "Paiement de votre inscription - " . $event->titre;
        
        return $this->subject($subject)
                    ->view('emails.payment-link-sent')
                    ->with([
                        'event' => $event,
                        'registration' => $this->registration,
                        'paymentLink' => $this->paymentLink,
                    ]);
    }
}
