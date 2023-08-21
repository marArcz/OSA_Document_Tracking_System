<?php

namespace App\Notifications;

use App\Models\SubmissionBin;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewSubmissionBin extends Notification
{
    use Queueable;

    public SubmissionBin $submissionBin;
    /**
     * Create a new notification instance.
     */
    public function __construct($submissionBin)
    {
        $this->submissionBin = $submissionBin;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('A new submission bin is created!')
            ->action('Open Submission Bin', url(route('unit_head.submission_bin', ['id' => $this->submissionBin->id])))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'submission_bin_id'=> $this->submissionBin->id
        ];
    }
}
