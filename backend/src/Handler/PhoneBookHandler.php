<?php

namespace App\Handler;

use App\Entity\PhoneBook;
use App\Service\ValidatorService;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\HttpFoundation\Request;

class PhoneBookHandler
{
    private ValidatorService $validator;
    private ManagerRegistry $doctrine;

    public function __construct(ValidatorService $validator, ManagerRegistry $doctrine)
    {
        $this->validator = $validator;
        $this->doctrine = $doctrine;
    }

    /**
     * @throws Exception
     */
    public function handlePhoneBookCreate(Request $request)
    {
        $data = $request->toArray();
        $phone = (new PhoneBook())
            ->setFirstname($data['firstname'])
            ->setLastname($data['lastname'])
            ->setPhoneNumber($data['phonenumber']);

        $validate = $this->validator->validate($phone);

        if($validate) {
            $entityManager = $this->doctrine->getManager();

            $entityManager->persist($phone);

            $entityManager->flush();
        }
    }
}
