var $body = $('body');

$.getJSON('Tree.json', function (theJson) {

    draw(theJson);

    function getId(dato) {
        for(data in dato){
            return data;
        }
        $body.append($tempUl);
    }

    function draw(theJson) {
        var $tempUl1 = $('<ul>');
        for(index in theJson){
            var $tempUl = $('<ul>');
            $tempUl.append(index);
            var id = getId(theJson[index]);
            var id =theJson[index];
            var $tempLi = $('<li><input type="checkbox">' + id + '</li>');

            if(id == "[object Object]"){
                console.log(id);
                draw(id);
            }

            // if(theJson[index].length > 0){
            // console.log(theJson[index]);
            // $tempLi.append(theJson[index]);
            // }
            $tempUl.append($tempLi);
            $tempUl1.append($tempUl);
        }
        return $tempUl1;
    }

    $body.append(draw(theJson));
});