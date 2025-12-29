<?php

namespace App\Mail;

use App\Models\EventRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EventRegistrationRejected extends Mailable
{
    use Queueable, SerializesModels;

    public $registration;

    /**
     * Create a new message instance.
     *
     * @param EventRegistration $registration
     * @return void
     */
    public function __construct(EventRegistration $registration)
    {
        $this->registration = $registration;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $event = $this->registration->event;
        $subject = "Désolé, votre inscription n'a pas été retenue - " . $event->titre;
        
        return $this->subject($subject)
                    ->view('emails.event-registration-rejected')
                    ->with([
                        'event' => $event,
                        'registration' => $this->registration,
                    ]);
    }
}
