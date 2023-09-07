<x-mail::message>
{{$report->submission_bin->title}}
<hr>

<strong>Your submitted report has been {{strtolower($report->status)}}</strong>

<x-mail::button :align="'left'" :url="$url">
View report
</x-mail::button>

#
#
<small>Submitted on {{$report->created_at}}</small>

</x-mail::message>
