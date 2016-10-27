var $suLu = $('<ul><input type="checkbox">Don Papá<span> - </span></ul>');

$.getJSON("Tree.json", function($data){

    for(j=0; j<$data.length; j++){
        $suLu.append(draw($data[j]));
    }
    $('body').append($suLu);

    function draw($data) {
        var $ul = $('<ul></ul>').append('<input type="checkbox">' + $data.name );
        if($data.sons.length > 0){
            $ul.append('<span> - </span>');
            for (var i = 0; i<$data.sons.length; i++){
                $ul.append(draw($data.sons[i]));
            }
        }
        return $ul;
    }

    $('span').click(function () {
        var $this = $(this);
        $this.parent().find('ul').toggle('slow');
        if($this.text() == ' - '){
            $this.text(' + ');
        }else{
            $this.text(' - ');
        }
    });
    $('input').click(function () {
        var $this = $(this);
        $this.is(':checked') ?  $this.parent().find('input').prop('checked', true) :$this.parent().find('input').prop('checked', false);
        // $this.parent().find('input').prop('checked', $this.is(':checked'))
    });

});

