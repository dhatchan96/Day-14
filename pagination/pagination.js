const container = document.createElement('div');
container.className = 'pagination';
const data = document.createElement('div');
var previous ;

for (var i = 0; i < 12; i++) {
    var anchor = document.createElement('a');
    if(i==0){
        anchor.textContent = "<<";
    }else if(i==11){
        anchor.textContent = ">>";
    }else{  
    anchor.textContent = i;    
    }
    anchor.id = i;
    anchor.addEventListener('click', (ev) => {
        ev.preventDefault();
        data.innerHTML = '';
        ev.target.className = 'active';
        if(document.getElementById(previous)){
            document.getElementById(previous).setAttribute('class', '');
        }       
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Request was successful                    
                    var final = parseInt(ev.target.textContent) * 10;
                    var start = final - 10;
                    var response = JSON.parse(xhr.responseText);
                    for (var i = start; i<final; i++) {
                        var ul = document.createElement('ul');
                        var li = document.createElement('li');
                        li.textContent = JSON.stringify(response[i]);
                        ul.appendChild(li);
                        data.appendChild(ul);
                        container.appendChild(data);
                    }
                } else {
                    // Error handling
                    console.error('XHR request failed with status: ' + xhr.status);
                }
            }
        };
        xhr.send();
        previous = parseInt(ev.target.id);
    });
    container.appendChild(anchor);
}

document.body.appendChild(container);