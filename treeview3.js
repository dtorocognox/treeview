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
        $this.parent().find('input').prop('checked', $this.is(':checked'));
        if($this.parent().find('input').is(':checked')){
            $this.parent().prop('checked', true);
        }
        console.log($this.parent().parent().find('input').not('input:first').prop('checked')).length;
        console.log($this.parent().parent().find('input').not('input:first'));
        console.log($this.parent().parent().children());
        if($this.parent().find().is(':checked')){
            console.log("si");
        }
    });

});

