$( function() {
    $( ".user_main-readyLinksArea" ).sortable();

    $( ".user_main-readyLinksArea li" ).droppable({
      drop:  function() {
        ModalcurrentIndex()
  
      }
  });
  });

