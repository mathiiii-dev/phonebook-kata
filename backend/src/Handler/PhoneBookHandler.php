<?php

namespace App\Handler;

use App\Entity\PhoneBook;
use App\Repository\PhoneBookRepository;
use App\Service\ValidatorService;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Component\HttpFoundation\Request;

class PhoneBookHandler
{
    private ValidatorService $validator;
    private ManagerRegistry $doctrine;
    private PhoneBookRepository $phoneBookRepository;

    public function __construct(ValidatorService $validator, ManagerRegistry $doctrine, PhoneBookRepository $phoneBookRepository)
    {
        $this->validator = $validator;
        $this->doctrine = $doctrine;
        $this->phoneBookRepository = $phoneBookRepository;
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

        if ($validate) {
            $entityManager = $this->doctrine->getManager();

            $entityManager->persist($phone);

            $entityManager->flush();
        }
    }

    /**
     * @throws Exception
     */
    public function handlePhoneBookEdit(Request $request, int $id)
    {
        $data = $request->toArray();
        $phone = $this->phoneBookRepository->findOneBy(['id' => $id]);

        $phone
            ->setPhoneNumber($data['phoneNumber'])
            ->setLastname($data['lastname'])
            ->setFirstname($data['firstname']);

        $validate = $this->validator->validate($phone);

        if ($validate) {

            $entityManager = $this->doctrine->getManager();

            $entityManager->flush();
        }
    }
}
