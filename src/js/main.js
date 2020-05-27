

// hover wrapper__item_inner
let wrapper__item_inner = document.querySelector('.wrapper__item_inner');
console.log(wrapper__item_inner);

[].forEach.call(wrapper__item_inner, function(el){
    el.addEventListener('mousemove', console_aaa);
    // el.style.color = 'orange';
})





wrapper__item_inner.addEventListener('mousemove', function(elem) {
        console.log(elem.clientX);
        wrapper__item_inner.style.transform = String(
            "perspective(100vh)"
            + "rotateX(" + elem.pageY +"deg)"
            + "rotateY(" + elem.pageX +"deg)"
            
            
            ); 
    })
    
    function console_aaa(el) {
        // el.style.color = 'orange';
        console.log('rotate(' + el.pageX + 'deg)')
}