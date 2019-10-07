const urlGet = "http://studenter.miun.se/~rese1800/dt173g/webbtjanstDel1/corses.php/api";
fetch(urlGet).then(function (response) {
  if (response.status !== 200) {
    console.log(response.status);
    return;
  }

  response.json().then(function (data) {
    data.forEach(element => {
      $("#courses").append('<tr><td>' + element.Code + '</td><td class="long">' + element.Name + '</td><td class="center">' + element.Progression + '</td><td><a href="' + element.Course_syllabus + '" target="blank">Webblänk</a></td><td class="center btn" id="deletebtn' + element.Id + '">x</td><td class="btn" id="btn' + element.Id + '">Ändra</td></tr>');
      const change = $('#btn' + element.Id);
      const deletebtn = $('#deletebtn' + element.Id);
      const urlSet = "http://studenter.miun.se/~rese1800/dt173g/webbtjanstDel1/corses.php/api/" + element.Id;
      /* CHANGE COURSE */

      $(change).click(function () {
        $('html, body').animate({
          scrollTop: $("#newname").offset().top
        }, 2000);
        $('#newname').html('Ändra kurs');
        $('#submit').html('Ändra');
        $('#ccode').val(element.Code);
        $('#cname').val(element.Name);
        $('#prog').val(element.Progression);
        $('#sylla').val(element.Course_syllabus);
        $('#submit').click(function () {
          if ($('#ccode').val() == '') {
            $('#ccode').focus();
            $('#error').html('Alla fält måste vara ifyllda');
          } else if ($('#cname').val() == '') {
            $('#cname').focus();
            $('#error').html('Alla fält måste vara ifyllda');
          } else if ($('#prog').val() == '') {
            $('#prog').focus();
            $('#error').html('Alla fält måste vara ifyllda');
          } else if ($('#sylla').val() == '') {
            $('#sylla').focus();
            $('#error').html('Alla fält måste vara ifyllda');
          } else {
            let jsonStr = JSON.stringify({
              "code": $('#ccode').val(),
              "name": $('#cname').val(),
              "prog": $('#prog').val(),
              "course_syllabus": $('#sylla').val()
            });
            fetch(urlSet, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: jsonStr
            }).then(res => res.json()).then(data => location.reload()).catch(err => console.log(err));
          }
        });
      });
      /* DELETE COURSE */

      $(deletebtn).click(function () {
        fetch(urlSet, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(data => location.reload()).catch(err => location.reload());
      });
    });
    /* SUBMIT COURSE */

    $('#submit').click(function () {
      if ($('#ccode').val() == '') {
        $('#ccode').focus();
        $('#error').html('Alla fält måste vara ifyllda');
      } else if ($('#cname').val() == '') {
        $('#cname').focus();
        $('#error').html('Alla fält måste vara ifyllda');
      } else if ($('#prog').val() == '') {
        $('#prog').focus();
        $('#error').html('Alla fält måste vara ifyllda');
      } else if ($('#sylla').val() == '') {
        $('#sylla').focus();
        $('#error').html('Alla fält måste vara ifyllda');
      } else {
        let jsonStr = JSON.stringify({
          "code": $('#ccode').val(),
          "name": $('#cname').val(),
          "prog": $('#prog').val(),
          "course_syllabus": $('#sylla').val()
        });
        fetch(urlGet, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonStr
        }).then(res => res.json()).then(data => location.reload()).catch(err => console.log(err));
      }
    });
  });
}).catch(function (err) {
  console.log('Fetch Error :-S', err);
});
//# sourceMappingURL=main.js.map
