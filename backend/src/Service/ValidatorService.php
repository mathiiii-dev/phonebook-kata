<?php

namespace App\Service;

use Exception;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ValidatorService
{
    private ValidatorInterface $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    /**
     * @throws Exception
     */
    public function validate($object): bool
    {
        $errors = $this->validator->validate($object);

        if (count($errors) > 0) {
           throw new BadRequestHttpException($errors->get(0)->getMessage());
        }

        return true;
    }
}
