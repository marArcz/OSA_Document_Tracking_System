<x-mail::message>
# Unit Head Notification
 
A new submission bin is created: {{$submissionBin->title}}
 
<x-mail::button :url="$url">
Open Submission Bin
</x-mail::button>
 
Thanks,<br>
{{ config('app.name') }}
</x-mail::message>