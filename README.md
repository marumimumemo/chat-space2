# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false|
|mail|string|unique:true,null; false|
|password|string|null; false|

### Association
- has_many :groups,through:members
- has_many :messages
- has_many :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|reference|null: false, foreign_key: true|

### Association
- has_many :members
- has_many :messages
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body  |text|       |
|image |string|     |
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|


### Association
- belongs_to :user
- belongs_to :group

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group