

// hover wrapper__item_inner
let wrapper__item_inner = document.getElementsByClassName('wrapper__item_inner');
console.log(wrapper__item_inner);

[].forEach.call(wrapper__item_inner, function(el){
    el.addEventListener('mousemove', console_aaa);
})

// wrapper__item_inner.addEventListener('mousemove', function(elem) {
//     console.log(elem.clientX);
// })

function console_aaa(el) {
    console.log(el.pageX)
}