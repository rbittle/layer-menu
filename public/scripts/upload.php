<?php

/*
 *  !!! VON'S SUPPOSEDLY NOT SHIT CODE !!!
 */

$maxFileSize = 1024000 * 10;
// max size 10MB

$formFileName = 'file';

if(!$_FILES[$formFileName]['name'])
    die('no image');

if($_FILES[$formFileName]['error'])
    die('error: '.$_FILES[$formFileName]);

if($_FILES[$formFileName]['size'] > $maxFileSize)
    die('image was too big');

$savePath = strtolower('uploads/%s'.$_FILES[$formFileName]['name']);

move_uploaded_file($_FILES[$formFileName]['name'], $savePath);
