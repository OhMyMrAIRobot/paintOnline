create table rooms
(
    id      int auto_increment
        primary key,
    session varchar(255) not null,
    constraint unique_session
        unique (session)
);

create table room_config
(
    session   varchar(255)                   not null
        primary key,
    width     int          default 1280      not null,
    height    int          default 720       not null,
    color     varchar(256) default '#FFFFFF' not null,
    url       text                           not null invisible,
    urlWidth  int          default 1280      not null,
    urlHeight int          default 720       not null,
    constraint room_config_ibfk_1
        foreign key (session) references rooms (session)
);

create
definer = root@localhost procedure InsertData(IN session_id varchar(255))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION ROLLBACK;
START TRANSACTION;

INSERT INTO paintDB.rooms (session) VALUES (session_id);

INSERT INTO room_config (session) VALUES (session_id);

COMMIT;
END;