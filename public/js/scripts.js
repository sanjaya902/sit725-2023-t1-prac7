const addCards = (items) => {
    console.log(items);
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align"> <div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+ item.image +'"></img></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">'+ item.title +'<i class="material-icons right">more_vert</i></span><p><a href="#">About this nature</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span><p class="card-text">'+item.description+'</p></div></div></div>';
        $('#card-section').append(itemToAppend);
    });
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();

    console.log('form data: ', formData);
    addNature(formData);
}

const getNature = () => {
    $.get('/api/nature',(response) => {
        if(response.statusCode === 200){
            addCards(response.data);
        }
    });
}

const addNature = (nature) => {
    $.ajax({
        url: 'api/nature',
        data: nature,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();

        }
    });
}

let socket = io();
socket.on('number', (message)=>{
    console.log('received from server: ' + message)
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();

    getNature();
    $('#formSubmit').click(()=>{
        submitForm();
    })
});