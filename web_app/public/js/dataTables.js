// If else must be done to have different table options for each page
// and because dataTables cannot be reinitialized
$(document).ready(function() {

if (view == 'orders') {
    $('.table.table-striped.table-bordered.tablesorter').DataTable( {
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      "search": {
          "caseInsensitive": false
      },
      "order": [[ 4, "desc" ]]
    });
}

else if (view == 'pest_and_disease_discover') {
    $('.table.table-striped.table-bordered.tablesorter').DataTable( {
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "search": {
            "caseInsensitive": false
        },
        "order": [[ 3, "desc" ]]
    });
}

else if (view == 'pest_and_disease_diagnoses') {
    $('.table.table-striped.table-bordered.tablesorter').DataTable( {
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "search": {
            "caseInsensitive": false
        },
        "order": [[ 2, "desc" ]]
    });
}

else {
    $('.table.table-striped.table-bordered.tablesorter').DataTable( {
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    "search": {
    "caseInsensitive": false
    },
    "order": [[ 0, "asc" ]]
    });
}

});