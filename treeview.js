var $body = $('body');

$.getJSON('Tree.json', function (theJson) {

    function getId(dato) {
        for(data in dato){
            return data;
        }
    }

    function draw(theJson) {
        var $tempUl = $('<ul>');
        for(index in theJson){
            console.log(theJson);
            var id = getId(theJson[index]);
            var $tempLi = $('<li><input type="checkbox">' + id + '</li>');

        if(theJson[index][id].length > 0){
            $tempLi.append(theJson[index]);
        }
            $tempUl.append($tempLi);
        }
        return $tempUl;
    }

    $body.append(draw(theJson));
});