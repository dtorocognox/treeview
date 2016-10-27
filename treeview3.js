var $suLu = $('<ul><span><input type="checkbox">Don Papá</span></ul>');

$.getJSON("Tree.json", function($data){

    for(j=0; j<$data.length; j++){
        $suLu.append(draw($data[j]));
    }
    $('body').append($suLu);

    function draw($data) {
        var $ul = $('<ul></ul>').append('<span><input type="checkbox">' + $data.name + '</span>');
        if($data.sons.length > 0){
            for (var i = 0; i<$data.sons.length; i++){
                $ul.append(draw($data.sons[i]));
            }
        }
        return $ul;
    }

    var $span = $('span');
    console.log($span);

});