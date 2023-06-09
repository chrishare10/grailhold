<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\validators;

use yii\base\UnknownPropertyException;
use yii\validators\RegularExpressionValidator;

/**
 * Color hex validator
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 3.0.0
 */
class ColorValidator extends RegularExpressionValidator
{
    /**
     * Normalizes a color value.
     *
     * @param string $color
     * @return string
     */
    public static function normalizeColor(string $color): string
    {
        // lowercase
        $color = strtolower($color);

        if ($color === 'transparent') {
            return $color;
        }

        // make sure it starts with a #
        if ($color[0] !== '#') {
            $color = '#' . $color;
        }

        // #abc => #aabbcc
        if (strlen($color) === 4) {
            $color = '#' . $color[1] . $color[1] . $color[2] . $color[2] . $color[3] . $color[3];
        }

        return $color;
    }

    /**
     * @inheritdoc
     */
    public $pattern = '/^(?:#[0-9a-f]{6}|transparent)$/';

    /**
     * @inheritdoc
     */
    public function validateAttribute($model, $attribute): void
    {
        $original = $value = $model->$attribute;

        if (is_string($value)) {
            $value = self::normalizeColor($value);
        }

        $result = $this->validateValue($value);
        if (!empty($result)) {
            $this->addError($model, $attribute, $result[0], $result[1]);
        } elseif ($value !== $original) {
            // update the model with the normalized value
            try {
                $model->$attribute = $value;
            } catch (UnknownPropertyException) {
                // fine, validate the original value
                parent::validateAttribute($model, $attribute);
            }
        }
    }
}
