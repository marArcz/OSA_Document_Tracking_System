<x-mail::message>
# Calendar Event
Today is the day!
<div class="calendar-event">
<div class="calendar-header"></div>
<div class="calendar-event-date">
<div>
<div class="date">
{{date('d',strtotime($event->start))}}
</div>
<h5>{{$event->title}}</h5>
</div>
</div>
</div>


<x-mail::button :align="'left'" :url="$url">
Access System
</x-mail::button>

</x-mail::message>
