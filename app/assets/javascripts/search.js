$(function() {
   var search_list = $("#user-search-result");
   var add_list = $('#chat-group-users');

function appendUser(user) {
   var html =
   `<div class="chat-group-user clearfix">
     <p class="chat-group-user__name">${ user.name }</p>
     <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
    </div>`
    search_list.append(html);
  }

function appendNoUser(user) {
    var html =
    `<div class="chat-group-user clearfix">
      <p>${ user }</p>
    </div>`
    search_list.append(html);
  }

function appendToMember(userName, userId) {
   var html =
   `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ userName}'>
     <input name='group[user_ids][]' type='hidden' value='${ userId }'>
     <p class='chat-group-user__name'>${ userName }</p>
     <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    add_list.append(html)
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーがいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on('click', '.user-search-add', function(){
    var userName = $(this).data('user-name');
    var userId = $(this).data('user-id');
    appendToMember(userName, userId);
    $(this).parent().remove();
  });

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
});