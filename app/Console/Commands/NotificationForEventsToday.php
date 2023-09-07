<?php

namespace App\Console\Commands;

use App\Models\CalendarEvent;
use App\Models\User;
use App\Notifications\CalendarEventNotification;
use Illuminate\Console\Command;

class NotificationForEventsToday extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:event-notifications';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make Notifications for today\'s events';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //find events for today's date
        $calendarEvents = CalendarEvent::whereRaw('type = ? (DATE(start) = CURDATE() || (CURDATE() > DATE(start) && DATE(end) < CURDATE()))',['event'])->get();

        $users = User::all();

        foreach ($users as $key => $user) {
            $user->notify(new CalendarEventNotification());
        }

        echo 'found ' . count($calendarEvents) . ' event(s).';
    }
}
