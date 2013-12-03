<?php 
	$images = $db->getListeImage();
        for($i=0; $i<count($images); $i++) {
            $temp = array();
            foreach ($db->getListeCategorieImg($images[$i]['id']) as $cat) {
                $temp[] = $cat['name'];
            }
            $images[$i]['cat'] = $temp;
        }
?>